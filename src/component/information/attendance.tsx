import {
  BRIDE_FULLNAME,
  dayjs,
  GROOM_FULLNAME,
  LOCATION,
  WEDDING_DATE,
} from "../../const"
import { Button } from "../button"
import { useModal } from "../modal"
import { useEffect, useRef, useState } from "react"
import HeartIcon from "../../icons/heart-icon.svg?react"
import CalendarIcon from "../../icons/calendar-icon.svg?react"
import MarkerIcon from "../../icons/marker-icon.svg?react"
import { GOOGLE_SCRIPT_URL, SERVER_URL } from "../../env"
import toast from "react-hot-toast"

const RULES = {
  name: {
    maxLength: 10,
  },
  count: {
    min: 0,
    default: 1,
  },
}

export const AttendanceInfo = () => {
  const { openModal, closeModal } = useModal()

  const initialized = useRef(false)

  const now = useRef(dayjs())

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return

    openModal({
      className: "attendance-info-modal",
      header: <div className="title">참석 의사 전달 안내</div>,
      content: (
        <>
          <div className="info-message">
            축하의 마음으로 참석해주시는
            <br />
            모든 분들을 귀하게 모실 수 있도록
            <br />
            참석 및 식사 여부를 미리 여쭙고자 합니다.
            <div className="break" />
            부담없이 알려주시면
            <br />
            정성껏 준비하겠습니다.
          </div>
          <div className="wedding-info">
            <HeartIcon /> 신랑 {GROOM_FULLNAME} & 신부 {BRIDE_FULLNAME}
            <br />
            <CalendarIcon /> {WEDDING_DATE.format("YYYY년 MMMM D일 dddd A h시")}
            <br />
            <MarkerIcon /> {LOCATION}
          </div>
        </>
      ),
      footer: (
        <>
          <Button
            buttonStyle="style2"
            onClick={() => {
              closeModal()
              openModal(attendanceModalInfo)
            }}
          >
            참석 의사 전달하기
          </Button>
          <Button
            buttonStyle="style2"
            className="bg-light-grey-color text-dark-color"
            onClick={closeModal}
          >
            닫기
          </Button>
        </>
      ),
    })
  }, [openModal, closeModal])

  if (!SERVER_URL || WEDDING_DATE.isBefore(now.current)) return null

  return (
    <div className="info-card">
      <div className="label">참석 의사 전달</div>
      <div className="content">
        신랑, 신부에게 참석의사를
        <br />
        미리 전달할 수 있어요.
      </div>

      <div className="break" />

      <Button
        style={{ width: "100%" }}
        onClick={() => {
          openModal(attendanceModalInfo)
        }}
      >
        참석 의사 전달하기
      </Button>
    </div>
  )
}

const AttendanceModalContent = () => {
  const { closeModal } = useModal()
  const inputRef = useRef({ side: {}, meal: {} }) as React.RefObject<{
    side: {
      groom: HTMLInputElement
      bride: HTMLInputElement
    }
    name: HTMLInputElement
    meal: {
      yes: HTMLInputElement
      undecided: HTMLInputElement
      no: HTMLInputElement
    }
    count: HTMLInputElement
  }>

  const submitData = async () => {
    try {
      const side = inputRef.current.side.groom.checked
        ? "groom"
        : inputRef.current.side.bride
          ? "bride"
          : null
      const name = inputRef.current.name.value
      const meal = inputRef.current.meal.yes.checked
        ? "yes"
        : inputRef.current.meal.undecided.checked
          ? "undecided"
          : inputRef.current.meal.no.checked
            ? "no"
            : null
      const count = Number(inputRef.current.count.value)

      if (!side) {
        toast.error("신랑 또는 신부를 선택해주세요.")
        return
      }

      if (!name) {
        toast.error("성함을 입력해주세요.")
        return
      }
      if (name.length > RULES.name.maxLength) {
        toast.error(`성함을 ${RULES.name.maxLength}자 이하로 입력해주세요.`)
        return
      }

      if (!meal) {
        toast.error("식사 여부를 선택해주세요.")
        return
      }

      if (isNaN(count)) {
        toast.error("참석 인원을 입력해주세요.")
        return
      }
      if (count < RULES.count.min) {
        toast.error(`참석 인원을 ${RULES.count.min}명 이상으로 입력해주세요.`)
        return
      }

      closeModal()

      const SCRIPT_URL = GOOGLE_SCRIPT_URL

      if (!SCRIPT_URL) {
        toast.error(
          "환경변수 파일(.env)에 VITE_GOOGLE_SCRIPT_URL을 설정해주세요.",
        )
        return
      }

      const formData = new FormData()
      formData.append("side", side)
      formData.append("name", name)
      formData.append("meal", meal)
      formData.append("count", String(count))

      await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors", // Google Apps Script로의 cross-origin 요청에 필요합니다.
      })

      // 'no-cors' 모드에서는 응답을 확인할 수 없으므로, 요청이 성공했다고 가정합니다.
      toast.success("참석 의사가 성공적으로 전달되었습니다.")
    } catch (error) {
      console.error("Error submitting attendance:", error)
      const SCRIPT_URL = GOOGLE_SCRIPT_URL
      if (SCRIPT_URL) {
        const formData = new FormData()
        formData.append("side", "groom")
        formData.append("name", "시도했으나 실패")
        formData.append("meal", "no")
        formData.append("count", "0")
        fetch(SCRIPT_URL, {
          method: "POST",
          body: formData,
          mode: "no-cors",
        })
      }
    }
  }

  return (
    <form
      id="attendance-form"
      className="form"
      onSubmit={(e) => {
        e.preventDefault()
        submitData()
      }}
    >
      <div className="input-group">
        <div className="label">구분</div>
        <div className="select-input">
          <label>
            <input
              type="radio"
              name="side"
              value="groom"
              hidden
              defaultChecked
              ref={(ref) =>
                (inputRef.current.side.groom = ref as HTMLInputElement)
              }
            />
            <span>신랑</span>
          </label>

          <label>
            <input
              type="radio"
              name="side"
              value="bride"
              hidden
              ref={(ref) =>
                (inputRef.current.side.bride = ref as HTMLInputElement)
              }
            />
            <span>신부</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">성함</div>
        <div className="input">
          <input
            type="text"
            placeholder="참석자 성함을 입력해주세요."
            maxLength={RULES.name.maxLength}
            ref={(ref) => (inputRef.current.name = ref as HTMLInputElement)}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="label">식사</div>
        <div className="radio-input">
          <label>
            <input
              type="radio"
              name="meal"
              value="yes"
              ref={(ref) =>
                (inputRef.current.meal.yes = ref as HTMLInputElement)
              }
            />
            <span>예정</span>
          </label>

          <label>
            <input
              type="radio"
              name="meal"
              value="undecided"
              ref={(ref) =>
                (inputRef.current.meal.undecided = ref as HTMLInputElement)
              }
            />
            <span>미정</span>
          </label>

          <label>
            <input
              type="radio"
              name="meal"
              value="no"
              ref={(ref) =>
                (inputRef.current.meal.no = ref as HTMLInputElement)
              }
            />
            <span>불참</span>
          </label>
        </div>
      </div>

      <div className="input-group">
        <div className="label">참석 인원 (본인 포함)</div>
        <div>
          <input
            type="number"
            min={RULES.count.min}
            defaultValue={RULES.count.default}
            ref={(ref) => (inputRef.current.count = ref as HTMLInputElement)}
          />
          명
        </div>
      </div>
    </form>
  )
}
const AttendanceModalFooter = () => {
  const { closeModal } = useModal()
  return (
    <>
      <Button buttonStyle="style2" type="submit" form="attendance-form">
        전달하기
      </Button>
      <Button
        buttonStyle="style2"
        className="bg-light-grey-color text-dark-color"
        onClick={closeModal}
      >
        닫기
      </Button>
    </>
  )
}

const attendanceModalInfo = {
  className: "attendance-modal",
  header: <div className="title">참석 의사 전달하기</div>,
  content: <AttendanceModalContent />,
  footer: <AttendanceModalFooter />,
}
