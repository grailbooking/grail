interface ExportReportData {
    shop_id: string;
    report_type: 'revenue' | 'appointments' | 'clients';
    start_date: string;
    end_date: string;
}
export declare const exportReport: import("firebase-functions/v2/https").CallableFunction<ExportReportData, any, unknown>;
export {};
//# sourceMappingURL=exportReport.d.ts.map