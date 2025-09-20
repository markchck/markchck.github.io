import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2026-01-24 11:30", "Asia/Seoul")
export const HOLIDAYS = [15]

export const LOCATION = "서울동부지방법원 민원동 3층 동백홀"
export const LOCATION_ADDRESS = "서울시 송파구 문정동 법원로 101"

export const SHARE_ADDRESS = LOCATION
export const SHARE_ADDRESS_TITLE = LOCATION

//!
export const WEDDING_HALL_POSITION = [127.1203921, 37.4833419]

export const NMAP_PLACE_ID = 491389872 // 서울동부지방법원
export const KMAP_PLACE_ID = 1328399623 // 서울동부지방법원

export const BRIDE_FULLNAME = "진주"
export const BRIDE_FIRSTNAME = "주"
export const BRIDE_TITLE = "장녀"
export const BRIDE_FATHER = "진형준"
export const BRIDE_MOTHER = "김정아"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "010-2093-5377",
    account: "우리은행 0000000000000",
  },
  {
    relation: "신부 아버지",
    name: BRIDE_FATHER,
    phone: "010-0000-0000",
    account: "하나은행 00000000000",
  },
  {
    relation: "신부 어머니",
    name: BRIDE_MOTHER,
    phone: "010-0000-0000",
    account: "하나은행 00000000000000",
  },
]

export const GROOM_FULLNAME = "기재민"
export const GROOM_FIRSTNAME = "재민"
export const GROOM_TITLE = "차남"
export const GROOM_FATHER = "기한주"
export const GROOM_MOTHER = "정지선"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "010-7104-4828",
    account: "하나은행 00000000000000",
  },
  {
    relation: "신랑 아버지",
    name: GROOM_FATHER,
    phone: "010-0000-0000",
    account: "신한은행 000000000000",
  },
  {
    relation: "신랑 어머니",
    name: GROOM_MOTHER,
    phone: "010-0000-0000",
    account: "국민은행 000000000000",
  },
]
