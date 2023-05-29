import { faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const ProjectDetails = () => {
  return (
    <Fragment>
      <Container className='mt-5'>
        <Row>
          <Col lg={6} md={6} sm={12}>
            <div className='about-thumb-wrap after-shape'>
              <img src="https://solverwp.com/demo/html/edumint/assets/img/about/2.png" alt="Project" />
            </div>
          </Col>

          <Col lg={6} md={6} sm={12} className="mt-5">
            <div className='project-details'>
              <h1 className='projectDetailsText'>Education in continuing a proud tradition.</h1>
              <p className='detailsName'>The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph,</p>
              <div className="cardSubTitle text-justify">
                <FontAwesomeIcon
                  className="iconBullent"
                  icon={faCheckSquare}
                />{" "}
                Requirment Gathering
              </div>
              <div className="cardSubTitle text-justify">
                <FontAwesomeIcon
                  className="iconBullent"
                  icon={faCheckSquare}
                />{" "}
                Metus inerdum Metus
              </div>
              <div className="cardSubTitle text-justify">
                <FontAwesomeIcon
                  className="iconBullent"
                  icon={faCheckSquare}
                />{" "}
                Ligula cur maecenas
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default ProjectDetails;
