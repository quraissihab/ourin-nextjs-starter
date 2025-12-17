import { NextRequest, NextResponse } from 'next/server';

/**
 * Dynamic User Route
 * 
 * Handle individual user operations:
 * - GET: Fetch single user
 * - PUT: Update user
 * - DELETE: Delete user
 * 
 * @example
 * GET /api/users/1
 * PUT /api/users/1 { name: 'Updated Name' }
 * DELETE /api/users/1
 */

// Mock user data (same reference as parent route in production)
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', createdAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: '2024-02-20' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user', createdAt: '2024-03-10' },
];

type Params = {
  params: Promise<{ id: string }>;
};

/**
 * GET /api/users/[id]
 * Fetch a single user by ID
 */
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const user = mockUsers.find(u => u.id === id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/[id]
 * Update a user by ID
 */
export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const userIndex = mockUsers.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Validate email if provided
    if (body.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Update user (only provided fields)
    const updatedUser = {
      ...mockUsers[userIndex],
      ...body,
      id: mockUsers[userIndex].id, // Prevent ID modification
    };

    mockUsers[userIndex] = updatedUser;

    return NextResponse.json({ success: true, data: updatedUser });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/[id]
 * Delete a user by ID
 */
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const userIndex = mockUsers.findIndex(u => u.id === id);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const deletedUser = mockUsers.splice(userIndex, 1)[0];

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
