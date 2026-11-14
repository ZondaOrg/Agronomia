package com.agro.feature.report.controller;

import com.agro.core.api.Api;
import com.agro.feature.report.dto.request.Step3PreviewRequestDTO;
import com.agro.feature.report.dto.response.StepPreviewResponseDTO;
import com.agro.feature.report.orchestrator.previewStep2.PreviewStep3;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(Api.REPORT)
@RestController
public class ReportControllerREST {

    private final PreviewStep3 previewStep3;

    public ReportControllerREST(PreviewStep3 previewStep3) {
        this.previewStep3 = previewStep3;
    }

    @PostMapping("/preview/step3")
    public ResponseEntity<StepPreviewResponseDTO> getDataToStep3(@RequestBody Step3PreviewRequestDTO request){
        return ResponseEntity.ok(previewStep3.getPreview(request.idProvider(), request.idProduct(), request.idOptionals()));
    }
}
