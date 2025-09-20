import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용시
            <br />
            지하철 8호선 <b>문정역 3번출구</b> (도보 8분)
            <br />
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            문정법조단지 건영아파트 하차 (도보 10분)
            <br />
            - 일반버스(녹색): 30, 31, 32, 100, 331
            <br />
            - 간선버스(청색): 302, 303, 320, 333, 343
            <br />
            - 지선버스(녹색): 3322, 3420
            <br />
            - 직행버스(적색): 500-1, 1009, 1112, 1117
            <br />→ 마을버스 <b>송파 02번</b> 이용 (서울동부지방법원 앞 정류장
            하차)
            <br />
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            네이버 지도, 카카오 네비, 티맵 등 이용
            <br />
            <b>서울동부지방법원 민원동</b> 검색
            <br />
            - 주차 요금은 무료입니다.
            <br />
          </div>
          <div />
          <div className="content"></div>
        </div>
      </LazyDiv>
    </>
  )
}
