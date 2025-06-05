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
      dim_campaign: {
        Row: {
          campaign_id: number
          campaign_name: string
          discount_pct: number | null
          end_date: string
          marketing_spend_nok: number | null
          start_date: string
        }
        Insert: {
          campaign_id?: number
          campaign_name: string
          discount_pct?: number | null
          end_date: string
          marketing_spend_nok?: number | null
          start_date: string
        }
        Update: {
          campaign_id?: number
          campaign_name?: string
          discount_pct?: number | null
          end_date?: string
          marketing_spend_nok?: number | null
          start_date?: string
        }
        Relationships: []
      }
      dim_customer: {
        Row: {
          acquisition_channel: string | null
          age_band: string | null
          customer_id: number
          gender: string | null
          region: string | null
          signup_date: string
        }
        Insert: {
          acquisition_channel?: string | null
          age_band?: string | null
          customer_id: number
          gender?: string | null
          region?: string | null
          signup_date: string
        }
        Update: {
          acquisition_channel?: string | null
          age_band?: string | null
          customer_id?: number
          gender?: string | null
          region?: string | null
          signup_date?: string
        }
        Relationships: []
      }
      dim_product: {
        Row: {
          brand_line: string | null
          category: string | null
          cogs_unit_nok: number | null
          launch_date: string | null
          price_nok: number | null
          product_id: number
          product_name: string
        }
        Insert: {
          brand_line?: string | null
          category?: string | null
          cogs_unit_nok?: number | null
          launch_date?: string | null
          price_nok?: number | null
          product_id?: number
          product_name: string
        }
        Update: {
          brand_line?: string | null
          category?: string | null
          cogs_unit_nok?: number | null
          launch_date?: string | null
          price_nok?: number | null
          product_id?: number
          product_name?: string
        }
        Relationships: []
      }
      fact_cogs: {
        Row: {
          cogs_date: string
          cogs_nok: number | null
          product_id: number
        }
        Insert: {
          cogs_date: string
          cogs_nok?: number | null
          product_id: number
        }
        Update: {
          cogs_date?: string
          cogs_nok?: number | null
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fact_cogs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "dim_product"
            referencedColumns: ["product_id"]
          },
        ]
      }
      fact_inventory_daily: {
        Row: {
          inventory_date: string
          product_id: number
          stock_level: number | null
        }
        Insert: {
          inventory_date: string
          product_id: number
          stock_level?: number | null
        }
        Update: {
          inventory_date?: string
          product_id?: number
          stock_level?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fact_inventory_daily_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "dim_product"
            referencedColumns: ["product_id"]
          },
        ]
      }
      fact_returns: {
        Row: {
          order_id: string
          reason_code: string | null
          refund_amount_nok: number | null
          return_date: string | null
          return_id: string
        }
        Insert: {
          order_id: string
          reason_code?: string | null
          refund_amount_nok?: number | null
          return_date?: string | null
          return_id: string
        }
        Update: {
          order_id?: string
          reason_code?: string | null
          refund_amount_nok?: number | null
          return_date?: string | null
          return_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fact_returns_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "fact_transactions"
            referencedColumns: ["order_id"]
          },
        ]
      }
      fact_transactions: {
        Row: {
          campaign_id: number | null
          customer_id: number
          date: string
          discount_pct: number | null
          order_id: string
          product_id: number
          quantity: number | null
          revenue_nok: number | null
          sale_type: string | null
          unit_price: number | null
        }
        Insert: {
          campaign_id?: number | null
          customer_id: number
          date: string
          discount_pct?: number | null
          order_id: string
          product_id: number
          quantity?: number | null
          revenue_nok?: number | null
          sale_type?: string | null
          unit_price?: number | null
        }
        Update: {
          campaign_id?: number | null
          customer_id?: number
          date?: string
          discount_pct?: number | null
          order_id?: string
          product_id?: number
          quantity?: number | null
          revenue_nok?: number | null
          sale_type?: string | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fact_transactions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "dim_campaign"
            referencedColumns: ["campaign_id"]
          },
          {
            foreignKeyName: "fact_transactions_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "dim_customer"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "fact_transactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "dim_product"
            referencedColumns: ["product_id"]
          },
        ]
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
