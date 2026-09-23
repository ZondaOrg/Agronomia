package com.agro.feature.email.service.impl;

import com.agro.feature.email.contracts.EmailSendRegister;
import com.agro.feature.email.templates.service.EmailTemplateService;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Transactional
@Profile({"dev", "prod", "seed"})
@Slf4j
public class EmailServiceImpl implements EmailSendRegister {
    private final Resend resend;

    @Value("${RESEND_EMAIL}")
    private String from;

    private final EmailTemplateService emailTemplateService;

    public EmailServiceImpl(
            @Value("${resend.api-key}") String apiKey, EmailTemplateService emailTemplateService
    ) {
        this.resend = new Resend(apiKey);
        this.emailTemplateService = emailTemplateService;
    }

    @Override
    public void sendRegister(String nameUser, String email, String password, String nameCompany) {
        Map<String, Object> variables = Map.of(
                "nombre", nameUser,
                "email", email,
                "password", password,
                "nombreEmpresa", nameCompany
        );

        String html = emailTemplateService.render("welcome", variables);

        sendHtmlEmail(email, "¡Bienvenido!", html);
    }

    private void sendHtmlEmail(String to, String subject, String html) {
        try {
            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from(from)
                    .to(to)
                    .subject(subject)
                    .html(html)
                    .build();

            resend.emails().send(params);

        } catch (ResendException e) {
            log.warn("Error enviando email", e);
            throw new RuntimeException("Error enviando email");
        }
    }
}
