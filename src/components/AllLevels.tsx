// Hendawy Was Here
import { SetStateAction, ChangeEvent, useRef, useState } from "react";
import "../assets/css/style.css";
import ProfileF from "../assets/img/profileF.jpg";
import HiddenSVG from "./HiddenSVG";
import surroundingsMiller from "../assets/img/surroundings-miller.svg";
import Level1 from "../levels/Level1";

import {
  FirstFloorPins,
  SecondFloorPins,
  ThirdFloorPins,
  FourthFloorPins,
  FifthFloorPins,
} from "../components/Lists/PinsLists";
import { contentItems } from "../components/Lists/ContentLists";
import { listItems } from "../components/Lists/AsideList";

function App() {
  const [level, setLevel] = useState<number>(0);
  const [selectedLevel, setSelectedLevel] = useState<string | number>(0);
  const [map, setMap] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [searchVisible, setSearchVisible] = useState<boolean>(false);
  const initialList = listItems;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [listTerms, setListItems] = useState(initialList);

  const handleClick = (num: number): void => {
    if (level !== num) {
      setLevel(num);
      setSelectedLevel(`levels--selected-${num} levels--opened`);
      setOpen(false);
      setMap(true);
      setRotationX(70);
      setRotationZ(-45);
    }
  };

  const levelControls = (move: string): void => {
    if (level < 7 && move === "up") {
      setLevel(level + 1);
      setSelectedLevel(`levels--selected-${level + 1} levels--opened`);
      setOpen(false);
    } else if (move === "down" && level > 1) {
      setLevel(level - 1);
      setSelectedLevel(`levels--selected-${level - 1} levels--opened`);
    } else if (move === "backAll") {
      setContent("");
      setLevel(0);
      setOpen(false);
      setMap(false);
      setSelectedLevel(0);
      setRotationX(70);
      setRotationZ(-45);
    }
  };

  const showSearch = (): void => {
    setSearchVisible(true);
  };
  const hideSearch = (): void => {
    setSearchVisible(false);
  };

  const handelOpenContent = (dataSpace: string): void => {
    setOpen(true);
    setContent(dataSpace);
  };
  const handelCloseContent = (): void => {
    setContent("");
    setOpen(false);
    setMap(true);
  };

  const handelSearchNav = (
    navLevel: SetStateAction<number>,
    dataSpace: SetStateAction<string>
  ): void => {
    if (level !== navLevel) {
      setLevel(navLevel);
      setSelectedLevel(`levels--selected-${navLevel} levels--opened`);
      setOpen(true);
      setContent(dataSpace);
      setMap(true);
      setRotationX(70);
      setRotationZ(-45);
    }
  };
  const [rotationX, setRotationX] = useState<number>(70);
  const [rotationZ, setRotationZ] = useState<number>(-45);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    startDragging(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    const touch = e.touches[0];
    startDragging(touch.clientX, touch.clientY);
  };

  const startDragging = (clientX: number, clientY: number): void => {
    setIsDragging(true);
    setStartX(clientX);
    setStartY(clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      const speed = 0.2; // Adjust the speed factor as needed
      const newRotationX = rotationX + deltaY * speed;
      setRotationX(Math.min(90, Math.max(40, newRotationX))); // Limit rotationX to the range [40, 90]
      setRotationZ(rotationZ + deltaX * speed);

      setStartX(e.clientX);
      setStartY(e.clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (isDragging) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      const speed = 0.2; // Adjust the speed factor as needed
      const newRotationX = rotationX + deltaY * speed;
      setRotationX(Math.min(90, Math.max(40, newRotationX))); // Limit rotationX to the range [40, 90]
      setRotationZ(rotationZ + deltaX * speed);

      setStartX(touch.clientX);
      setStartY(touch.clientY);
    }
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
  };

  const handleTouchEnd = (): void => {
    setIsDragging(false);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    setSearchTerm(searchText);

    const filteredList = initialList.filter((item) => {
      return item.listLink.toLowerCase().includes(searchTerm);
    });
    console.log(filteredList);
    setListItems(filteredList);
  };
  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* <!-- start icons --> */}
      <HiddenSVG />
      {/* <!-- end icons --> */}

      <div className="map-container">
        <div className="map-main">
          <header className="library-header">
            <h1>Colby Libraries</h1>
            <ul>
              <li>
                <a className="current-library" href="/">
                  Miller
                </a>
              </li>
            </ul>
          </header>
          <div className="legend">
            <ul>
              <li>
                <strong>Key:</strong>
              </li>
              <li>
                <span className="category4">&#9679;</span>Resources
              </li>
              <li>
                <span className="category3">&#9679;</span>Lab/Study Areas
              </li>
              <li>
                <span className="category2">&#9679;</span>Classrooms
              </li>
              <li>
                <span className="category1">&#9679;</span>Staff
              </li>
            </ul>
          </div>
          <div
            className={
              isOpen
                ? "building miller building--content-open"
                : "building miller "
            }
          >
            <div className="surroundings">
              <img
                draggable={false}
                className={
                  map
                    ? "surroundings__map surroundings--hidden"
                    : "surroundings__map"
                }
                src={surroundingsMiller}
                alt="Surroundings"
              />
            </div>
            <div
              style={{
                transform: ` rotateX(${rotationX}deg) rotateZ(${rotationZ}deg) translateZ(-15vmin)`,
                transformOrigin: "center",
              }}
              className={`levels ${selectedLevel} svg-group  `}
            >
              <div
                onClick={() => handleClick(1)}
                className={
                  level == 1
                    ? "level level--1 level--current "
                    : "level level--1 "
                }
                aria-label="Level 1"
              >
                <Level1 />
                <div
                  className={`level__pins ${
                    level == 1
                      ? "level__pins level__pins--active"
                      : "level__pins "
                  }`}
                >
                  {FirstFloorPins.map((pin) => (
                    <a
                      key={pin.dataSpace}
                      className={
                        pin.dataSpace === content
                          ? pin.aClass + " pin--active"
                          : pin.aClass
                      }
                      onClick={() => {
                        handelOpenContent(pin.dataSpace);
                      }}
                      data-category={pin.dataCategory}
                      data-space={pin.dataSpace}
                      href="#"
                      aria-label={pin.arialabel}
                    >
                      <span className="pin__icon">
                        <svg
                          className="icon icon--pin"
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref="#icon-pin"></use>
                        </svg>
                        <svg
                          className={pin.svgClassName}
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref={pin.xlinkHref}></use>
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div
                className={
                  level == 2
                    ? "level level--2 level--current"
                    : "level level--2"
                }
                aria-label="Level 2"
                onClick={() => handleClick(2)}
              >
                <Level1 />
                <div
                  className={`level__pins ${
                    level == 2 ? "level__pins--active" : ""
                  }`}
                >
                  {SecondFloorPins.map((pin) => (
                    <a
                      key={pin.dataSpace}
                      className={
                        pin.dataSpace === content
                          ? pin.aClass + " pin--active"
                          : pin.aClass
                      }
                      onClick={() => {
                        handelOpenContent(pin.dataSpace);
                      }}
                      data-category={pin.dataCategory}
                      data-space={pin.dataSpace}
                      href="#"
                      aria-label={pin.arialabel}
                    >
                      <span className="pin__icon">
                        <svg
                          className="icon icon--pin"
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref="#icon-pin"></use>
                        </svg>
                        <svg
                          className={pin.svgClassName}
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref={pin.xlinkHref}></use>
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div
                className={
                  level == 3
                    ? "level level--3 level--current"
                    : "level level--3"
                }
                aria-label="Level 3"
                onClick={() => handleClick(3)}
              >
                <Level1 />
                <div
                  className={`level__pins ${
                    level == 3 ? "level__pins--active" : ""
                  }`}
                >
                  {ThirdFloorPins.map((pin) => (
                    <a
                      key={pin.dataSpace}
                      className={
                        pin.dataSpace === content
                          ? pin.aClass + " pin--active"
                          : pin.aClass
                      }
                      onClick={() => {
                        handelOpenContent(pin.dataSpace);
                      }}
                      data-category={pin.dataCategory}
                      data-space={pin.dataSpace}
                      href="#"
                      aria-label={pin.arialabel}
                    >
                      <span className="pin__icon">
                        <svg
                          className="icon icon--pin"
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref="#icon-pin"></use>
                        </svg>
                        <svg
                          className={pin.svgClassName}
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref={pin.xlinkHref}></use>
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div
                className={
                  level == 4
                    ? "level level--4 level--current"
                    : "level level--4"
                }
                aria-label="Level 4"
                onClick={() => handleClick(4)}
              >
                <Level1 />
                <div
                  className={`level__pins ${
                    level == 4 ? "level__pins--active" : ""
                  }`}
                >
                  {FourthFloorPins.map((pin) => (
                    <a
                      key={pin.dataSpace}
                      className={
                        pin.dataSpace === content
                          ? pin.aClass + " pin--active"
                          : pin.aClass
                      }
                      onClick={() => {
                        handelOpenContent(pin.dataSpace);
                      }}
                      data-category={pin.dataCategory}
                      data-space={pin.dataSpace}
                      href="#"
                      aria-label={pin.arialabel}
                    >
                      <span className="pin__icon">
                        <svg
                          className="icon icon--pin"
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref="#icon-pin"></use>
                        </svg>
                        <svg
                          className={pin.svgClassName}
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref={pin.xlinkHref}></use>
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <div
                onClick={() => handleClick(5)}
                className={
                  level == 5
                    ? "level level--5 level--current "
                    : "level level--5 "
                }
                aria-label="Level 5"
              >
                <Level1 />
                <div
                  className={`level__pins ${
                    level == 5
                      ? "level__pins level__pins--active"
                      : "level__pins "
                  }`}
                >
                  {FifthFloorPins.map((pin) => (
                    <a
                      className={
                        pin.dataSpace === content
                          ? pin.aClass + " pin--active"
                          : pin.aClass
                      }
                      onClick={() => {
                        handelOpenContent(pin.dataSpace);
                      }}
                      data-category={pin.dataCategory}
                      data-space={pin.dataSpace}
                      href="#"
                      aria-label={pin.arialabel}
                    >
                      <span className="pin__icon">
                        <svg
                          className="icon icon--pin"
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref="#icon-pin"></use>
                        </svg>
                        <svg
                          className={pin.svgClassName}
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref={pin.xlinkHref}></use>
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <div
                className={
                  level == 6
                    ? "level level--6 level--current"
                    : "level level--6"
                }
                aria-label="Level 6"
                onClick={() => handleClick(6)}
              >
                <Level1 />
                <div
                  className={`level__pins ${
                    level == 6 ? "level__pins--active" : ""
                  }`}
                >
                  {FirstFloorPins.map((pin) => (
                    <a
                      key={pin.dataSpace}
                      className={
                        pin.dataSpace === content
                          ? pin.aClass + " pin--active"
                          : pin.aClass
                      }
                      onClick={() => {
                        handelOpenContent(pin.dataSpace);
                      }}
                      data-category={pin.dataCategory}
                      data-space={pin.dataSpace}
                      href="#"
                      aria-label={pin.arialabel}
                    >
                      <span className="pin__icon">
                        <svg
                          className="icon icon--pin"
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref="#icon-pin"></use>
                        </svg>
                        <svg
                          className={pin.svgClassName}
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref={pin.xlinkHref}></use>
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              <div
                className={
                  level == 7
                    ? "level level--7 level--current"
                    : "level level--7"
                }
                aria-label="Level 7"
                onClick={() => handleClick(7)}
              >
                <Level1 />
                <div
                  className={`level__pins ${
                    level == 7
                      ? "level__pins level__pins--active"
                      : "level__pins "
                  }`}
                >
                  {FirstFloorPins.map((pin) => (
                    <a
                      key={pin.dataSpace}
                      className={
                        pin.dataSpace === content
                          ? pin.aClass + " pin--active"
                          : pin.aClass
                      }
                      onClick={() => {
                        handelOpenContent(pin.dataSpace);
                      }}
                      data-category={pin.dataCategory}
                      data-space={pin.dataSpace}
                      href="#"
                      aria-label={pin.arialabel}
                    >
                      <span className="pin__icon">
                        <svg
                          className="icon icon--pin"
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref="#icon-pin"></use>
                        </svg>
                        <svg
                          className={pin.svgClassName}
                          href="path/to/svg-sprite.svg"
                        >
                          <use xlinkHref={pin.xlinkHref}></use>
                        </svg>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button
            className="boxbutton boxbutton--dark open-search  searchMargen"
            aria-label="Show search"
            onClick={showSearch}
          >
            <svg className="icon icon--search">
              <use xlinkHref="#icon-search"></use>
            </svg>
          </button>
          <nav
            className={`buildingnav ${level == 0 ? "buildingnav--hidden" : ""}`}
          >
            <button
              className={
                level == 7
                  ? "boxbutton buildingnav__button--up boxbutton--disabled"
                  : "boxbutton buildingnav__button--up"
              }
              aria-label="Go up"
              onClick={() => levelControls("up")}
            >
              <svg className="icon icon--angle-down">
                <use xlinkHref="#icon-angle-up"></use>
              </svg>
            </button>
            <button
              className="boxbutton boxbutton--dark buildingnav__button--all-levels"
              aria-label="Back to all levels"
              onClick={() => levelControls("backAll")}
            >
              <svg className="icon icon--stack">
                <use xlinkHref="#icon-stack"></use>
              </svg>
            </button>
            <button
              className={
                level == 1
                  ? "boxbutton buildingnav__button--down boxbutton--disabled"
                  : "boxbutton buildingnav__button--down"
              }
              onClick={() => levelControls("down")}
              aria-label="Go down"
            >
              <svg className="icon icon--angle-down">
                <use xlinkHref="#icon-angle-down"></use>
              </svg>
            </button>
          </nav>
          <div className={isOpen ? "content content--open" : "content"}>
            {contentItems.map((item, index) => (
              <div
                key={index}
                className={
                  content === item.dataSpace
                    ? "content__item content__item--current"
                    : "content__item "
                }
                data-space={item.dataSpace}
                data-category={item.dataCategory}
              >
                <h3 className="content__item-title">{item.title}</h3>
                <h4>{item.role}</h4>
                <div className="content__item-details">
                  <p className="content__meta">
                    <span className="content__meta-item">
                      <strong>Office:</strong> {item.meta?.office}
                    </span>
                    <span className="content__meta-item">
                      <strong>Hours:</strong> {item.meta?.hours}
                    </span>
                    <span className="content__meta-item">
                      <strong>Phone:</strong> {item.meta?.phone}
                    </span>
                  </p>
                  <p className="content__desc">
                    <img src={ProfileF} alt="" /> {item.description}
                    <br />
                    <br />
                    Publications: <a href="#">Click here</a>
                  </p>
                </div>
              </div>
            ))}
            <button
              onClick={handelCloseContent}
              className={
                isOpen
                  ? "boxbutton boxbutton--dark content__button"
                  : "boxbutton boxbutton--dark content__button content__button--hidden"
              }
              aria-label="Close details"
            >
              <svg className="icon icon--cross">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
        </div>

        {/* <Aside /> */}
        <aside
          className={
            searchVisible
              ? "spaces-list spaces-list--open close-search"
              : "spaces-list"
          }
          id="spaces-list"
        >
          <div className="search">
            <input
              onChange={(e) => handleSearch(e)}
              className="search__input"
              placeholder="Search..."
            />
            <button
              className="boxbutton boxbutton--darker"
              aria-label="Close details"
              onClick={hideSearch}
            >
              <svg className="icon icon--cross">
                <use xlinkHref="#icon-cross"></use>
              </svg>
            </button>
          </div>
          <span className="label">
            <input
              id="sort-by-name"
              className="label__checkbox"
              type="checkbox"
              aria-label="Show alphabetically"
            />
            <label className="label__text">A - Z</label>
          </span>

          <ul className="list grouped-by-category">
            {listTerms.map((item, index) => (
              <li
                key={index}
                className="list__item"
                data-level={item.dataLevel}
                data-category={item.dataCategory}
                data-room={item.dataRoom}
                data-space={item?.dataSpace}
              >
                <a
                  href="#"
                  className="list__link"
                  onClick={() =>
                    handelSearchNav(parseInt(item.dataLevel), item?.dataSpace)
                  }
                >
                  {item.listLink}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

export default App;
