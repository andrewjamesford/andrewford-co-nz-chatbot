"use client";

import { ChatInput, useChatUI, useFile } from "@llamaindex/chat-ui";
import { DocumentInfo, ImagePreview } from "@llamaindex/chat-ui/widgets";
import { LlamaCloudSelector } from "./custom/llama-cloud-selector";
import { useClientConfig } from "./hooks/use-config";

export default function CustomChatInput() {
  const { requestData, isLoading, input } = useChatUI();
  const { backend } = useClientConfig();
  const {
    imageUrl,
    setImageUrl,
    uploadFile,
    files,
    removeDoc,
    reset,
    getAnnotations,
  } = useFile({ uploadAPI: `${backend}/api/chat/upload` });

  /**
   * Handles file uploads. Overwrite to hook into the file upload behavior.
   * @param file The file to upload
   */
  const handleUploadFile = async (file: File) => {
    // There's already an image uploaded, only allow one image at a time
    if (imageUrl) {
      alert("You can only upload one image at a time.");
      return;
    }

    try {
      // Upload the file and send with it the current request data
      await uploadFile(file, requestData);
    } catch (error: any) {
      // Show error message if upload fails
      alert(error.message);
    }
  };

  // Get references to the upload files in message annotations format, see https://github.com/run-llama/chat-ui/blob/main/packages/chat-ui/src/hook/use-file.tsx#L56
  const annotations = getAnnotations();

  return (
    <ChatInput
      className="shadow-xl rounded-xl border border-gray-200"
      resetUploadedFiles={reset}
      annotations={annotations}
    >
      {(imageUrl || files.length > 0) && (
        <div>
          {/* Image preview section */}
          {imageUrl && (
            <ImagePreview url={imageUrl} onRemove={() => setImageUrl(null)} />
          )}
          {/* Document previews section */}
          {files.length > 0 && (
            <div className="flex gap-4 w-full overflow-auto py-2">
              {files.map((file) => (
                <DocumentInfo
                  key={file.id}
                  document={{ url: file.url, sources: [] }}
                  className="mb-2 mt-2"
                  onRemove={() => removeDoc(file)}
                />
              ))}
            </div>
          )}
        </div>
        )
      }
      <ChatInput.Form className="flex flex-col md:flex-row gap-4">
        <ChatInput.Field />
        <div className="flex flex-row gap-2">
          <ChatInput.Upload onUpload={handleUploadFile} />
          <LlamaCloudSelector />
          <ChatInput.Submit
          className="w-full"
            disabled={
              isLoading || (!input.trim() && files.length === 0 && !imageUrl)
            }
          />
        </div>
      </ChatInput.Form>
    </ChatInput>
  );
}
