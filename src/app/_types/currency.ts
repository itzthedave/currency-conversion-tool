export interface Currency {
    code: number
    decimal_mark: string
    id: number
    name: string
    precision: number
    short_code: string
    subunit: number
    symbol: string
    symbol_first: boolean
    thousands_separator: string
}

export interface CurrencyFormValue {
    currency?: string,
    amount?: number,
}

export interface CurrenciesResponse {
    meta: { code: number, disclaimer: string },
    response: Currency[]
}

export interface ConvertResponse {
    "meta": responseMeta,
    "response": {
        "timestamp": number,
        "date": string,
        "from": string,
        "to": string,
        "amount": number,
        "value": number
    },
    "timestamp": number,
    "date": string,
    "from": string,
    "to": string,
    "amount": number,
    "value": number
}

interface responseMeta {
    code: number,
    disclaimer: string
}
