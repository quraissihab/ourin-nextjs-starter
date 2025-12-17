import { NextResponse } from 'next/server';

/**
 * Health Check API Route
 * 
 * Use this endpoint to verify the API is running.
 * Useful for:
 * - Load balancer health checks
 * - Monitoring services
 * - Uptime tracking
 * 
 * @example
 * GET /api/health
 * Response: { status: 'ok', timestamp: '2024-12-17T...', uptime: 123.45 }
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.2.0',
  });
}
