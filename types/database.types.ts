export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      berita: {
        Row: {
          created_at: string | null
          dibuat_pada: string
          gambar_url: string | null
          id: number
          id_video_youtube: Json | null
          is_utama: boolean | null
          judul: string
          jumlah_baca: number | null
          kategori: string
          kategori_id: number | null
          konten: string | null
          penulis: string | null
          penulis_id: number | null
          ringkasan: string
          slug: string | null
          status: string | null
          suka: number | null
          sumber: string
          updated_at: string | null
          url_gambar: string | null
          url_sumber: string
        }
        Insert: {
          created_at?: string | null
          dibuat_pada?: string
          gambar_url?: string | null
          id?: never
          id_video_youtube?: Json | null
          is_utama?: boolean | null
          judul: string
          jumlah_baca?: number | null
          kategori: string
          kategori_id?: number | null
          konten?: string | null
          penulis?: string | null
          penulis_id?: number | null
          ringkasan: string
          slug?: string | null
          status?: string | null
          suka?: number | null
          sumber: string
          updated_at?: string | null
          url_gambar?: string | null
          url_sumber: string
        }
        Update: {
          created_at?: string | null
          dibuat_pada?: string
          gambar_url?: string | null
          id?: never
          id_video_youtube?: Json | null
          is_utama?: boolean | null
          judul?: string
          jumlah_baca?: number | null
          kategori?: string
          kategori_id?: number | null
          konten?: string | null
          penulis?: string | null
          penulis_id?: number | null
          ringkasan?: string
          slug?: string | null
          status?: string | null
          suka?: number | null
          sumber?: string
          updated_at?: string | null
          url_gambar?: string | null
          url_sumber?: string
        }
        Relationships: [
          {
            foreignKeyName: "berita_kategori_id_fkey"
            columns: ["kategori_id"]
            isOneToOne: false
            referencedRelation: "kategori"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "berita_penulis_id_fkey"
            columns: ["penulis_id"]
            isOneToOne: false
            referencedRelation: "penulis"
            referencedColumns: ["id"]
          },
        ]
      }
      "berita terbaru": {
        Row: {
          id: number
          isi_berita: string | null
          judul: string | null
          kategori: string
          ringkasan: string | null
          sumber: string | null
          url_gambar: string | null
          url_sumber: string | null
        }
        Insert: {
          id?: number
          isi_berita?: string | null
          judul?: string | null
          kategori: string
          ringkasan?: string | null
          sumber?: string | null
          url_gambar?: string | null
          url_sumber?: string | null
        }
        Update: {
          id?: number
          isi_berita?: string | null
          judul?: string | null
          kategori?: string
          ringkasan?: string | null
          sumber?: string | null
          url_gambar?: string | null
          url_sumber?: string | null
        }
        Relationships: []
      }
      iklan: {
        Row: {
          aktif: boolean | null
          id: string
          kode_html: string
          tipe_iklan: string | null
          url_gambar_iklan: string | null
          url_tujuan: string | null
        }
        Insert: {
          aktif?: boolean | null
          id: string
          kode_html: string
          tipe_iklan?: string | null
          url_gambar_iklan?: string | null
          url_tujuan?: string | null
        }
        Update: {
          aktif?: boolean | null
          id?: string
          kode_html?: string
          tipe_iklan?: string | null
          url_gambar_iklan?: string | null
          url_tujuan?: string | null
        }
        Relationships: []
      }
      kategori: {
        Row: {
          id: number
          nama: string
          slug: string
        }
        Insert: {
          id?: number
          nama: string
          slug: string
        }
        Update: {
          id?: number
          nama?: string
          slug?: string
        }
        Relationships: []
      }
      komentar: {
        Row: {
          berita_id: number | null
          created_at: string | null
          id: number
          isi_komentar: string
          nama_pembaca: string
        }
        Insert: {
          berita_id?: number | null
          created_at?: string | null
          id?: number
          isi_komentar: string
          nama_pembaca: string
        }
        Update: {
          berita_id?: number | null
          created_at?: string | null
          id?: number
          isi_komentar?: string
          nama_pembaca?: string
        }
        Relationships: [
          {
            foreignKeyName: "komentar_berita_id_fkey"
            columns: ["berita_id"]
            isOneToOne: false
            referencedRelation: "berita"
            referencedColumns: ["id"]
          },
        ]
      }
      penulis: {
        Row: {
          avatar_url: string | null
          id: number
          nama: string
          peran: string | null
        }
        Insert: {
          avatar_url?: string | null
          id?: number
          nama: string
          peran?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: number
          nama?: string
          peran?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_berita_otomatis_gabungan: { Args: never; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
