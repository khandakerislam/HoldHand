package com.scholarship.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.core.io.InputStreamResource;

public class CleanupInputStreamResource extends InputStreamResource {


    public CleanupInputStreamResource(final File file) throws FileNotFoundException {
        super(new FileInputStream(file) {
            @Override
            public void close() throws IOException {
                super.close();
            }
        });
    }
}