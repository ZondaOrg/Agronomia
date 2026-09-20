export interface Notify<T> {
    title: string
    message: (data: T) => string 
}