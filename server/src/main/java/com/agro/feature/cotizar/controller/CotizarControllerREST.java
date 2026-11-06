package com.agro.feature.cotizar.controller;

import com.agro.core.api.Api;
import com.agro.feature.cotizar.dto.request.Step3PreviewRequestDTO;
import com.agro.feature.cotizar.dto.response.StepPreviewResponseDTO;
import com.agro.feature.cotizar.orchestrator.previewStep2.PreviewStep2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(Api.COTIZAR)
@RestController
public class CotizarControllerREST {

    private final PreviewStep2 previewStep2;

    public CotizarControllerREST(PreviewStep2 previewStep2) {
        this.previewStep2 = previewStep2;
    }

    @PostMapping("/step3")
    public ResponseEntity<StepPreviewResponseDTO> getDataToStep3(@RequestBody Step3PreviewRequestDTO request){
        return ResponseEntity.ok(previewStep2.getPreview(request.idProvider(), request.idProduct(), request.idOptionals()));
    }
}
