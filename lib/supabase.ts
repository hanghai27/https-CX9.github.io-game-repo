import { createClient, type SupabaseClient } from "@supabase/supabase-js"

const isBrowser = typeof window !== "undefined"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: SupabaseClient | null = null

// Chỉ khởi tạo client khi chạy trên trình duyệt.
// Điều này ngăn lỗi khi Next.js prerender / build trên server mà biến môi trường công khai không được cung cấp.
if (isBrowser) {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Thiếu biến môi trường Supabase (NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY)"
    )
  }
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
export type { SupabaseClient }
