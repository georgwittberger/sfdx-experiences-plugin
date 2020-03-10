import getRoutesFileNames from '../get-routes-file-names';

export default function getRoutesToCopy(
  sourceBundlePath: string,
  targetBundlePath: string,
  overwrite: boolean = false
): string[] {
  const sourceRoutes = getRoutesFileNames(sourceBundlePath);
  if (overwrite) return sourceRoutes;

  const targetRoutes = getRoutesFileNames(targetBundlePath);
  return sourceRoutes.filter(sourceRoute => !targetRoutes.includes(sourceRoute));
}
