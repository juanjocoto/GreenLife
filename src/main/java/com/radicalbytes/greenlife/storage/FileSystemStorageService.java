package com.radicalbytes.greenlife.storage;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import java.util.stream.Stream;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@ConfigurationProperties(value = "storage")
public class FileSystemStorageService implements StorageService {
    private String rootLocation;

    public String getRootLocation() {
        return rootLocation;
    }

    public void setRootLocation(String rootLocation) {
        this.rootLocation = rootLocation;
    }

    @Override
    public String store(MultipartFile file) {
        UUID uuid = UUID.randomUUID();
        String fileId = String.valueOf(uuid);

        // this.rootLocation = "C:\\green-life-images\\";
        this.rootLocation = "/home";

        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + file.getOriginalFilename());
            }
            Path roothPath = Paths.get(rootLocation);

            Files.copy(file.getInputStream(), roothPath.resolve(fileId));
            return fileId;
        } catch (IOException e) {
            throw new StorageException("Failed to store file " + file.getOriginalFilename() + " id: " + fileId, e);

        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(Paths.get(rootLocation), 1).filter(path -> !path.equals(this.rootLocation))
                    .map(path -> Paths.get(rootLocation).relativize(path));
        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }

    @Override
    public Path load(String filename) {
        return Paths.get(rootLocation).resolve(filename);
    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new StorageFileNotFoundException("Could not read file: " + filename);

            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(Paths.get(rootLocation).toFile());
    }

    @Override
    public void init() {
        try {
            Files.createDirectory(Paths.get(rootLocation));
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }

    @Override
    public boolean delete(String filename) {
        try {
            Path file = load(filename);
            Files.delete(file);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return true;
    }
}
