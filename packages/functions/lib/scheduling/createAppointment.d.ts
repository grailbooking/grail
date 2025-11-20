interface CreateAppointmentData {
    shop_id: string;
    barber_id: string;
    client_id: string;
    service_id: string;
    start_time: string;
    end_time: string;
}
export declare const createAppointment: import("firebase-functions/v2/https").CallableFunction<CreateAppointmentData, any, unknown>;
export {};
//# sourceMappingURL=createAppointment.d.ts.map