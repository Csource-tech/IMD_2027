import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const validUsernames = ["admin", "admin@imd2027.com", "secretariat@imd2027.com"];
    const validPasswords = ["admin", "admin123", "imd2027", "imd2027admin", "admin@imd2027"];

    const isUserValid = validUsernames.includes(String(username).trim().toLowerCase());
    const isPassValid = validPasswords.includes(String(password).trim());

    if (!isUserValid || !isPassValid) {
      return NextResponse.json(
        { error: "Invalid username or password. Please check your credentials." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
    });

    // Set auth cookie
    response.cookies.set("imd_admin_auth", "authenticated", {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error during authentication" },
      { status: 500 }
    );
  }
}
