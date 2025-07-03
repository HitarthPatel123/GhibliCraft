package com.ghibli.backend.Service;

import com.ghibli.backend.Client.StabilityAIClient;
import com.ghibli.backend.DTO.TextToImageRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GhibliArtService {

    private final StabilityAIClient stabilityAIClient;
    private final String apiKey;


    public GhibliArtService(StabilityAIClient stabilityAIClient, @Value("${stability.api.key}") String apiKey) {
        this.stabilityAIClient = stabilityAIClient;
        this.apiKey = apiKey;
    }

    public byte[] createGhibliArt(MultipartFile image, String prompt) {
        String finalPrompt = prompt+", in the beautiful and detailed anime style of studio Ghibli";
        String engineId = "stable-diffusion-v1-6";
        String stylePreset = "anime";

        return stabilityAIClient.generateImageFromImage(
                "Bearer " + apiKey,
                engineId,
                image,
                finalPrompt,
                stylePreset
        );
    }

    public byte[] createGhibliArtFromText(String prompt, String style) {
        String finalPrompt = prompt+", in the beautiful and detailed anime style of studio Ghibli";
        String engineId = "stable-diffusion-v1-6";
        String stylePreset = "anime";

        TextToImageRequest requestPayLoad = new TextToImageRequest(finalPrompt, stylePreset);

        return stabilityAIClient.generateImageFromText(
                "Bearer " + apiKey,
                engineId,
                requestPayLoad
        );
    }
}
