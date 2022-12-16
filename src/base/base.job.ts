export interface BaseJob {
    schedule?: string;
    run: () => void;
}