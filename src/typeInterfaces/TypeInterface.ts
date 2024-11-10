export interface IProfileData {
  profile_name: string
  profile_gender: 'm' | 'f' | 'other'
  profile_followers: {
    value: number
    type: 'numerical_short_scale' | string
    direction: 'positive' | 'negative' | 'neutral'
  }
  profile_display_picture: string
  profile_verified: 0 | 1
  profile_created_at: number
  profile_accounts: {
    instagram: 0 | 1
    youtube: 0 | 1
    email: 0 | 1
  }
  profile_username: string
  profile_type: string
  profile_theme: string[]
  profile_keyword: string[]
  profile_country: {
    code: string
    name: string
    continent: string
  }
  profile_engagement_rate: IProfileEngageMent
  profile_active_followers: IProfileEngageMent
  profile_quality: IProfileQuality
  profile_media_value: IProfileEngageMent
}

export interface IProfileEngageMent {
  value: number
  type: 'percentage' | 'currency' | string
  direction: 'positive' | 'negative' | 'neutral'
  display_direction_text: boolean
}
export interface IProfileQuality {
  score: {
    value: number
    direction: 'positive' | 'negative' | 'neutral'
    display_direction_text: boolean
  }
  score_metrics: {
    growth: number
    interaction: number
    impression: number
    reach: number
    media_value: number
  }
}

export interface IPostData {
  id: string
  created_at: number
  image: string
  reach: IPostItemValue
  impressions: IPostItemValue
  interactions: IPostItemValue
  engagement_rate: IPostItemValue
  likes_count: IPostItemValue
  comments_count: IPostItemValue
  media_value: IPostItemValue
}

export interface IPostItemValue {
  value: number
  type: 'numerical_short_scale' | 'percentage' | 'currency'
}

export const CountryDistributionEnum = {
  AR: 'Argentina',
  BR: 'Brazil',
  CN: 'China',
  GB: 'Great Britain',
  ID: 'Indonesia',
  IN: 'India',
  JP: 'Japan',
  KR: 'Korea',
  MX: 'Mexico',
  MY: 'Malaysia',
  PH: 'Philippines',
  RU: 'Russian',
  TH: 'Thailand',
  TW: 'Taiwan',
  US: 'United States of America',
  VN: 'Viet Nam	',
} as const
