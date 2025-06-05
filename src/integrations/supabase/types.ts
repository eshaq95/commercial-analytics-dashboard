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
      campaigns: {
        Row: {
          campaign_id: number
          campaign_name: string
          discount_pct: number
          end_date: string
          marketing_cost: number
          start_date: string
        }
        Insert: {
          campaign_id: number
          campaign_name: string
          discount_pct: number
          end_date: string
          marketing_cost: number
          start_date: string
        }
        Update: {
          campaign_id?: number
          campaign_name?: string
          discount_pct?: number
          end_date?: string
          marketing_cost?: number
          start_date?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          churn_date: string | null
          country: string
          customer_id: number
          is_active: boolean
          signup_date: string
          subscription_start: string | null
        }
        Insert: {
          churn_date?: string | null
          country: string
          customer_id: number
          is_active: boolean
          signup_date: string
          subscription_start?: string | null
        }
        Update: {
          churn_date?: string | null
          country?: string
          customer_id?: number
          is_active?: boolean
          signup_date?: string
          subscription_start?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          base_price: number
          product_id: number
          product_name: string
        }
        Insert: {
          base_price: number
          product_id: number
          product_name: string
        }
        Update: {
          base_price?: number
          product_id?: number
          product_name?: string
        }
        Relationships: []
      }
      subscription_kpis: {
        Row: {
          active_subscribers: number
          churn_rate: number
          churned_subscribers: number
          month: string
          mrr: number
          new_subscribers: number
        }
        Insert: {
          active_subscribers: number
          churn_rate: number
          churned_subscribers: number
          month: string
          mrr: number
          new_subscribers: number
        }
        Update: {
          active_subscribers?: number
          churn_rate?: number
          churned_subscribers?: number
          month?: string
          mrr?: number
          new_subscribers?: number
        }
        Relationships: []
      }
      transactions: {
        Row: {
          campaign_id: number | null
          customer_id: number
          date: string
          price: number
          product_id: number
          quantity: number
          revenue: number
          subscription_flag: boolean
          transaction_id: number
        }
        Insert: {
          campaign_id?: number | null
          customer_id: number
          date: string
          price: number
          product_id: number
          quantity: number
          revenue: number
          subscription_flag: boolean
          transaction_id: number
        }
        Update: {
          campaign_id?: number | null
          customer_id?: number
          date?: string
          price?: number
          product_id?: number
          quantity?: number
          revenue?: number
          subscription_flag?: boolean
          transaction_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_txn_campaign"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["campaign_id"]
          },
          {
            foreignKeyName: "fk_txn_customer"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["customer_id"]
          },
          {
            foreignKeyName: "fk_txn_product"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
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
