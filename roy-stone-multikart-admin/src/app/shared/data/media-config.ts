export interface MediaConfig {
    image: string[],
    video: string[],
    audio: string[],
    downloadFile: string[],
}

export const mediaConfig = {
    image: ['image/apng', 'image/avif', 'image/gif', 'image/jpeg', 'image/png', 'image/svg', 'image/svg+xml', 'image/webp'],
    video: ['video/mp4', 'video/webm', 'video/ogg'],
    audio: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
    downloadFile: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/zip', 'application/x-tar', 'application/gzip', 'text/plain'],
}

 