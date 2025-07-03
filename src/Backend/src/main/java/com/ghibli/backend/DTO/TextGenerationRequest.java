package com.ghibli.backend.DTO;

import lombok.Data;

@Data
public class TextGenerationRequest {

    private String prompt;
    private String style;
}