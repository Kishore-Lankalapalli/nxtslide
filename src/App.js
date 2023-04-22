import {Component} from 'react'
import {v4} from 'uuid'
import NxtSlide from './components/NxtSlide'
import './App.css'

// This is the list used in the application. You can move them to any component needed.
const slidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

// Replace your code here

class App extends Component {
  state = {
    bodyItem: slidesList[0],
    initialSlidesList: slidesList,
    isheadingSelected: false,
    isDescriptionSelected: false,
    headingText: '',
    descriptionText: '',
  }

  onChangeSlideCard = id => {
    const {initialSlidesList} = this.state
    const selectedSlide = initialSlidesList.find(item => item.id === id)

    this.setState({bodyItem: selectedSlide})
  }

  onChangeHeadingText = event => {
    const {bodyItem, initialSlidesList} = this.state
    const selectedSlide = initialSlidesList.find(
      item => item.id === bodyItem.id,
    )

    this.setState({
      headingText: event.target.value,
      bodyItem: {
        ...bodyItem,
        heading: event.target.value,
      },
      initialSlidesList: initialSlidesList.map(item => {
        if (item.id === bodyItem.id) {
          return {...item, heading: event.target.value}
        }
        return item
      }),
    })
  }

  onChangeDescriptionText = event => {
    const {bodyItem, initialSlidesList} = this.state
    const selectedSlide = initialSlidesList.find(
      item => item.id === bodyItem.id,
    )

    this.setState({
      descriptionText: event.target.value,
      bodyItem: {
        ...bodyItem,
        description: event.target.value,
      },
      initialSlidesList: initialSlidesList.map(item => {
        if (item.id === bodyItem.id) {
          return {...item, description: event.target.value}
        }
        return item
      }),
    })
  }

  onAddNewSlide = () => {
    const {initialSlidesList, bodyItem} = this.state

    const newSlide = {
      id: v4(),
      heading: 'Heading',
      description: 'Description',
    }
    const tabIndex = initialSlidesList.indexOf(bodyItem)

    const newSlides = [
      ...initialSlidesList.slice(0, tabIndex + 1),
      newSlide,
      ...initialSlidesList.slice(tabIndex + 1, initialSlidesList.length),
    ]
    console.log(newSlides)

    const newSlidesList = this.setState({
      initialSlidesList: newSlides,
      bodyItem: newSlide,
    })
  }

  render() {
    const {
      bodyItem,
      isheadingSelected,
      isDescriptionSelected,
      headingText,
      descriptionText,

      initialSlidesList,
    } = this.state

    return (
      <div className="nxt-slide-root-container">
        <div className="nav-container">
          <img
            className="nxt-slides-logo-image"
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-logo.png"
            alt="nxt slides logo"
          />
          <h1 className="nxt-slides-heading">Nxt Slides</h1>
        </div>
        <div className="button-container">
          <button
            type="button"
            onClick={this.onAddNewSlide}
            className="new-button"
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
              className="plus-icon-image"
              alt="new plus icon"
            />
            New
          </button>
        </div>
        <div className="main-container">
          <ol className="slides-lists-container">
            {initialSlidesList.map((item, index) => (
              <NxtSlide
                selectedItem={bodyItem.id}
                item={item}
                key={item.id}
                index={index}
                headingText={headingText}
                onChangeSlideCard={this.onChangeSlideCard}
              />
            ))}
          </ol>

          <div className="body-container">
            {isheadingSelected ? (
              <input
                value={headingText}
                className="heading-input-element"
                type="text"
                onChange={this.onChangeHeadingText}
                onBlur={() => this.setState({isheadingSelected: false})}
              />
            ) : (
              <h1
                onClick={() =>
                  this.setState({
                    isheadingSelected: true,
                    headingText: bodyItem.heading,
                  })
                }
                className="body-item-heading"
              >
                {bodyItem.heading}
              </h1>
            )}
            {isDescriptionSelected ? (
              <input
                onBlur={() => this.setState({isDescriptionSelected: false})}
                type="text"
                value={descriptionText}
                className="description-input-element"
                onChange={this.onChangeDescriptionText}
              />
            ) : (
              <p
                onClick={() =>
                  this.setState({
                    isDescriptionSelected: true,
                    descriptionText: bodyItem.description,
                  })
                }
                className="body-item-description"
              >
                {bodyItem.description}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
