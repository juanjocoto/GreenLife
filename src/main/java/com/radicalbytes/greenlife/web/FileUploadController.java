package com.radicalbytes.greenlife.web;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import com.codahale.metrics.annotation.Timed;
import com.radicalbytes.greenlife.domain.FileUploadStatus;
import com.radicalbytes.greenlife.storage.StorageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@RestController
@RequestMapping("/api/images")
public class FileUploadController {
    private final StorageService storageService;

    @Autowired
    public FileUploadController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping("/view")
    @Timed
    public String listUploadedFilesView(Model model) throws IOException {

        model.addAttribute("files",
                storageService.loadAll()
                        .map(path -> MvcUriComponentsBuilder
                                .fromMethodName(FileUploadController.class, "serveFile", path.getFileName().toString())
                                .build().toString())
                        .collect(Collectors.toList()));

        return "uploadForm";
    }

    @GetMapping("/dummy")
    @Timed
    public String dummy() {
        return "hello";
    }

    @GetMapping("/")
    @Timed
    public Collection<String> listUploadedFiles(Model model) throws IOException {

        Collection<String> files = storageService.loadAll().map(path -> path.getFileName().toString())
                .collect(Collectors.toList());

        return files;
    }

    @GetMapping("/{filename:.+}")
    @Timed
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PostMapping(path = { "", "/" }, produces = "application/json")
    @Timed
    public FileUploadStatus handleFileUpload(@RequestParam("file") MultipartFile file,
            RedirectAttributes redirectAttributes) {

        FileUploadStatus result = new FileUploadStatus();
        result.setStatus("ok");
        result.setMessage("You successfully uploaded " + file.getOriginalFilename() + "!");

        String fileId = storageService.store(file);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");

        result.setImageName(fileId);

        return result;
    }

    @DeleteMapping("/")
    @Timed
    public boolean deleteFile(@RequestParam String filename) {
        storageService.delete(filename);
        return true;
    }

    @PostMapping(path = "/document/bulk", produces = "application/json")
    @Timed
    public Map<String, String> loadBulkDocuments(@RequestParam("file") MultipartFile file,
            RedirectAttributes redirectAttributes) throws IOException {

        Map<String, String> result = new HashMap<String, String>();
        result.put("status", "ok");
        result.put("message", "You successfully uploaded " + file.getOriginalFilename() + "!");

        InputStream inputStream = file.getInputStream();
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
        String line = "";
        String cvsSplitBy = ",";

        while ((line = bufferedReader.readLine()) != null) {

            // use comma as separator
            String[] country = line.split(cvsSplitBy);

            System.out.println("Country [code= " + country[4] + " , name=" + country[5] + "]");

        }
        storageService.store(file);
        redirectAttributes.addFlashAttribute("message",
                "You successfully uploaded " + file.getOriginalFilename() + "!");

        return result;
        // return null;
    }
}