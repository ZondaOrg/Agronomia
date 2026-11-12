export interface AdvertenceData {
    subtitle: string;
    cancelText: string;
    confirmText: string;
    onConfirm?: () => void;
}