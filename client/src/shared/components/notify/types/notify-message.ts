export interface NotifyMessage {
    modal?: {
        title: string
        message: string
    },
    toast?: {
        title?: string 
        message: string
    }
}