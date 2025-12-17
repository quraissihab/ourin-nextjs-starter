import { NextRequest, NextResponse } from 'next/server';

/**
 * Users API Route (Example CRUD)
 * 
 * Demonstrates common API patterns:
 * - GET: Fetch all users with pagination
 * - POST: Create a new user with validation
 * 
 * In production, replace mock data with database queries.
 */

// Mock user data (replace with database in production)
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', createdAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: '2024-02-20' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user', createdAt: '2024-03-10' },
];

/**
 * GET /api/users
 * 
 * Fetch users with optional pagination and filtering.
 * 
 * Query params:
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 10)
 * - role: Filter by role
 * - search: Search by name or email
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const role = searchParams.get('role');
    const search = searchParams.get('search')?.toLowerCase();

    let filteredUsers = [...mockUsers];

    // Filter by role
    if (role) {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }

    // Search by name or email
    if (search) {
      filteredUsers = filteredUsers.filter(
        user =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search)
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit),
        hasNext: endIndex < filteredUsers.length,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users
 * 
 * Create a new user with validation.
 * 
 * Request body:
 * - name: string (required, min 2 chars)
 * - email: string (required, valid email)
 * - role: 'admin' | 'user' (optional, default: 'user')
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role = 'user' } = body;

    // Validation
    const errors: string[] = [];

    if (!name || name.length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Valid email is required');
    }

    if (!['admin', 'user'].includes(role)) {
      errors.push('Role must be "admin" or "user"');
    }

    // Check for existing email
    if (mockUsers.some(user => user.email === email)) {
      errors.push('Email already exists');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      role,
      createdAt: new Date().toISOString().split('T')[0],
    };

    // In production: await db.users.create(newUser)
    mockUsers.push(newUser);

    return NextResponse.json(
      { success: true, data: newUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
