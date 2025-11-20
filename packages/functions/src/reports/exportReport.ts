import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

interface ExportReportData {
  shop_id: string;
  report_type: 'revenue' | 'appointments' | 'clients';
  start_date: string;
  end_date: string;
}

/**
 * Callable function to export reports
 */
export const exportReport = onCall<ExportReportData>(async request => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated');
  }

  try {
    const { shop_id, report_type, start_date, end_date } = request.data;

    // TODO: Implement report generation
    // - Query data based on report type
    // - Format data as CSV/Excel
    // - Upload to Storage
    // - Return download URL

    logger.info('Generating report', {
      shop_id,
      report_type,
      start_date,
      end_date,
    });

    return {
      success: true,
      download_url: 'https://example.com/report.csv', // Stub
    };
  } catch (error) {
    logger.error('Error exporting report:', error);
    throw new HttpsError('internal', 'Failed to export report');
  }
});
