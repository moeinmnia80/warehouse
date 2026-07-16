/** Builds the URL for a package image from your API's route shape:
 *  {baseUrl}/my-suite/packages/{packageId}/images/{fileName}
 *  Use this when mapping your API's image list into RemoteDropzoneFile[]
 *  for the `initialFiles` prop — see the usage example at the bottom
 *  of Dropzone.tsx. */
export const buildPackageImageUrl = (
  baseUrl: string,
  packageId: string,
  fileName: string,
) => `${baseUrl}/my-suite/packages/${packageId}/images/${fileName}`;
