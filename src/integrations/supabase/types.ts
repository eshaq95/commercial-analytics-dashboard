export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      customer_behavior_fact: {
        Row: {
          behavior_id: number
          bounce_rate: number | null
          cart_abandonment_rate: number | null
          conversion_rate: number | null
          created_at: string | null
          customer_id: number | null
          date_id: string | null
          orders_placed: number | null
          page_views: number | null
          session_duration: number | null
          total_sessions: number | null
        }
        Insert: {
          behavior_id?: number
          bounce_rate?: number | null
          cart_abandonment_rate?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          customer_id?: number | null
          date_id?: string | null
          orders_placed?: number | null
          page_views?: number | null
          session_duration?: number | null
          total_sessions?: number | null
        }
        Update: {
          behavior_id?: number
          bounce_rate?: number | null
          cart_abandonment_rate?: number | null
          conversion_rate?: number | null
          created_at?: string | null
          customer_id?: number | null
          date_id?: string | null
          orders_placed?: number | null
          page_views?: number | null
          session_duration?: number | null
          total_sessions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_behavior_fact_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "customer_behavior_fact_date_id_fkey"
            columns: ["date_id"]
            isOneToOne: false
            referencedRelation: "time_dim"
            referencedColumns: ["date_id"]
          },
        ]
      }
      customers: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          customer_id: number
          customer_name: string
          customer_segment: string | null
          email: string | null
          phone: string | null
          registration_date: string | null
          state: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          customer_id?: number
          customer_name: string
          customer_segment?: string | null
          email?: string | null
          phone?: string | null
          registration_date?: string | null
          state?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          customer_id?: number
          customer_name?: string
          customer_segment?: string | null
          email?: string | null
          phone?: string | null
          registration_date?: string | null
          state?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      geography: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          geography_id: number
          latitude: number | null
          longitude: number | null
          region: string | null
          state: string | null
          zip_code: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          geography_id?: number
          latitude?: number | null
          longitude?: number | null
          region?: string | null
          state?: string | null
          zip_code?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          geography_id?: number
          latitude?: number | null
          longitude?: number | null
          region?: string | null
          state?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      inventory_fact: {
        Row: {
          created_at: string | null
          date_id: string | null
          geography_id: number | null
          inventory_id: number
          product_id: number | null
          reorder_level: number | null
          stock_quantity: number
          stock_value: number | null
          units_received: number | null
          units_sold: number | null
        }
        Insert: {
          created_at?: string | null
          date_id?: string | null
          geography_id?: number | null
          inventory_id?: number
          product_id?: number | null
          reorder_level?: number | null
          stock_quantity: number
          stock_value?: number | null
          units_received?: number | null
          units_sold?: number | null
        }
        Update: {
          created_at?: string | null
          date_id?: string | null
          geography_id?: number | null
          inventory_id?: number
          product_id?: number | null
          reorder_level?: number | null
          stock_quantity?: number
          stock_value?: number | null
          units_received?: number | null
          units_sold?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_fact_date_id_fkey"
            columns: ["date_id"]
            isOneToOne: false
            referencedRelation: "time_dim"
            referencedColumns: ["date_id"]
          },
          {
            foreignKeyName: "inventory_fact_geography_id_fkey"
            columns: ["geography_id"]
            isOneToOne: false
            referencedRelation: "geography"
            referencedColumns: ["geography_id"]
          },
          {
            foreignKeyName: "inventory_fact_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      products: {
        Row: {
          brand: string | null
          category: string | null
          cost: number | null
          created_at: string | null
          price: number | null
          product_id: number
          product_name: string
          subcategory: string | null
        }
        Insert: {
          brand?: string | null
          category?: string | null
          cost?: number | null
          created_at?: string | null
          price?: number | null
          product_id?: number
          product_name: string
          subcategory?: string | null
        }
        Update: {
          brand?: string | null
          category?: string | null
          cost?: number | null
          created_at?: string | null
          price?: number | null
          product_id?: number
          product_name?: string
          subcategory?: string | null
        }
        Relationships: []
      }
      sales_fact: {
        Row: {
          cost_of_goods: number | null
          created_at: string | null
          customer_id: number | null
          date_id: string | null
          discount: number | null
          geography_id: number | null
          product_id: number | null
          profit: number | null
          quantity: number
          sale_id: number
          total_amount: number
          unit_price: number
        }
        Insert: {
          cost_of_goods?: number | null
          created_at?: string | null
          customer_id?: number | null
          date_id?: string | null
          discount?: number | null
          geography_id?: number | null
          product_id?: number | null
          profit?: number | null
          quantity: number
          sale_id?: number
          total_amount: number
          unit_price: number
        }
        Update: {
          cost_of_goods?: number | null
          created_at?: string | null
          customer_id?: number | null
          date_id?: string | null
          discount?: number | null
          geography_id?: number | null
          product_id?: number | null
          profit?: number | null
          quantity?: number
          sale_id?: number
          total_amount?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "sales_fact_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "sales_fact_date_id_fkey"
            columns: ["date_id"]
            isOneToOne: false
            referencedRelation: "time_dim"
            referencedColumns: ["date_id"]
          },
          {
            foreignKeyName: "sales_fact_geography_id_fkey"
            columns: ["geography_id"]
            isOneToOne: false
            referencedRelation: "geography"
            referencedColumns: ["geography_id"]
          },
          {
            foreignKeyName: "sales_fact_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["product_id"]
          },
        ]
      }
      time_dim: {
        Row: {
          date_id: string
          day_name: string | null
          day_of_week: number | null
          is_holiday: boolean | null
          is_weekend: boolean | null
          month: number | null
          month_name: string | null
          quarter: number | null
          week: number | null
          year: number | null
        }
        Insert: {
          date_id: string
          day_name?: string | null
          day_of_week?: number | null
          is_holiday?: boolean | null
          is_weekend?: boolean | null
          month?: number | null
          month_name?: string | null
          quarter?: number | null
          week?: number | null
          year?: number | null
        }
        Update: {
          date_id?: string
          day_name?: string | null
          day_of_week?: number | null
          is_holiday?: boolean | null
          is_weekend?: boolean | null
          month?: number | null
          month_name?: string | null
          quarter?: number | null
          week?: number | null
          year?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
