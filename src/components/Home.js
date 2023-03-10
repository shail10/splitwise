import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import image from '../Assets/Images/welcome.svg'

const Home = () => {
  return (
    <img
      style={{
        height: '50rem',
        width: '50rem',
        marginLeft: '30rem',
      }}
      src={image}
    ></img>
  )
}

const Wrapper = styled.section``

export default Home
