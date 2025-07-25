export function formatSecondsToHM(seconds: number): string {
    if (seconds < 0 || !Number.isFinite(seconds)) {
      throw new Error("Invalid seconds input");
    }
  
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    return `${hours}h ${minutes}m`;
  }