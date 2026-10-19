export interface InitializePaymentParams {
  planId: 'monthly' | 'yearly'
  email: string
  callbackUrl?: string
}

export interface PaystackInitResponse {
  status: boolean
  message: string
  data?: {
    authorization_url: string
    access_code: string
    reference: string
  }
  error?: string
}

export async function initializePaystackPayment(params: InitializePaymentParams): Promise<PaystackInitResponse> {
  const response = await fetch('/api/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
  return response.json()
}

export async function verifyPaystackPayment(reference: string) {
  const response = await fetch(`/api/payments?reference=${encodeURIComponent(reference)}`)
  return response.json()
}
