import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    id: bigint;
    packageName: string;
    postLink: string;
    instagramUsername: string;
    fullName: string;
    timestamp: Time;
}
export type Time = bigint;
export interface backendInterface {
    getAllOrders(): Promise<Array<Order>>;
    submitOrder(fullName: string, instagramUsername: string, packageName: string, postLink: string): Promise<void>;
}
