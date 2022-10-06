package com.employeeapp;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import javax.annotation.Nonnull;

public class BackgroundWorker extends Worker {
    private final Context context;

    public BackgroundWorker(@Nonnull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
        this.context = context;
    }
    @NonNull
    @Override
    public Result doWork() {

            Log.w("bg", "Worker do work");

//            Bundle extras = bundleExtras();
            Intent service = new Intent(this.context, BackgroundHeadlessTaskService.class);
//            service.putExtras(extras);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//                createChannel();
                this.context.startForegroundService(service);
            } else {
                this.context.startService(service);
            }
            return Result.success();

    }
}

