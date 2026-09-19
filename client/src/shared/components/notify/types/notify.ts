export interface Notify {
    modal?: {
        title: string
        message: string
    },
    toast?: {
        title?: string 
        message: string
    }
}