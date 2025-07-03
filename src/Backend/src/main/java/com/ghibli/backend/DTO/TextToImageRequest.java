package com.ghibli.backend.DTO;

import java.util.List;

public class TextToImageRequest {

    private List<TextPrompt> text_Prompts;
    private double cfg_scale = 7;
    private int height = 512;
    private int width = 768;
    private int samples = 1;
    private int steps = 30;
    private String style_preset;

    public static class TextPrompt {
        private String text;
        public TextPrompt(String text) {
            this.text = text;
        }
        public String getText() {
            return text;
        }
        public void setText(String text) {
            this.text = text;
        }
    }

    public TextToImageRequest(String text, String style) {
        this.text_Prompts = List.of(new TextPrompt(text));
        this.style_preset = style;
    }

    public List<TextPrompt> getText_Prompts() {
        return text_Prompts;
    }

    public double getCfg_scale() {
        return cfg_scale;
    }

    public int getHeight() {
        return height;
    }

    public int getWidth() {
        return width;
    }

    public int getSamples() {
        return samples;
    }

    public int getSteps() {
        return steps;
    }

    public String getStyle_preset() {
        return style_preset;
    }
}
