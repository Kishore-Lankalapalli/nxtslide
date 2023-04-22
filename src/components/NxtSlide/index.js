import './index.css'

const NxtSlide = props => {
  const {item, index, selectedItem, onChangeSlideCard, headingText} = props
  const {id, heading, description} = item

  const moveToNextSlide = () => {
    onChangeSlideCard(id)
  }

  return (
    <li
      testid={`slideTab${index + 1}`}
      onClick={moveToNextSlide}
      className={
        selectedItem === id ? 'selected-slide-container' : 'slide-container'
      }
    >
      <p className="serial-number">{index + 1}</p>
      <div className="slide-card-container">
        <h1 className="slide-title-text">{heading}</h1>
        <p className="sub-course-text">{description}</p>
      </div>
    </li>
  )
}

export default NxtSlide
