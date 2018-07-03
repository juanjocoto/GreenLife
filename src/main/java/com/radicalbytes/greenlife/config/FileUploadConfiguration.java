package com.radicalbytes.greenlife.config;

import com.radicalbytes.greenlife.storage.StorageService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class FileUploadConfiguration extends WebMvcConfigurerAdapter {

    private String imgFileLocation;

	public String getImgFileLocation() {
		return imgFileLocation;
	}

	public void setImgFileLocation(String imgFileLocation) {
		this.imgFileLocation = imgFileLocation;
    }

    @Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		if(imgFileLocation == null) {
			imgFileLocation = "file:///C:/green-life-images/";
		}
		
		registry.addResourceHandler("/api/images/**")
				.addResourceLocations(imgFileLocation);

	}
    
    @Bean
    CommandLineRunner init(StorageService storageService) {
        return (args) -> {
            /*
             * storageService.deleteAll(); storageService.init();
             */
        };
    }
}