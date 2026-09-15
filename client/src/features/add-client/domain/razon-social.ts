import type { Client } from "./client"
export interface RazonSocial extends Client {
    razonSocial: string
    associatePhone: string
}