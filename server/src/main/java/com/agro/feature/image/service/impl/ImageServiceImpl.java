package com.agro.feature.image.service.impl;

import com.agro.feature.image.contracts.SaveImageService;
import com.agro.feature.image.domain.Imagen;
import com.agro.feature.image.service.ImageService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@Transactional
public class ImageServiceImpl implements ImageService, SaveImageService {
    private final Cloudinary cloudinary;

    public ImageServiceImpl(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;

    }

    @Override
    public Imagen saveImage(MultipartFile imagen) {
        if (imagen == null || imagen.isEmpty()) {
            return null;
        }

        try {
            Map result = cloudinary.uploader().upload(imagen.getBytes(), ObjectUtils.emptyMap());
            return Imagen.builder()
                    .publicId((String) result.get("public_id"))
                    .url((String) result.get("secure_url"))
                    .build();
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar la imagen", e);
        }
    }
}
