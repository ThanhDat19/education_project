import React, { useEffect, Fragment } from 'react'
import Footer from '../components/Footer/Footer'
import PageTop from '../components/PageTop/PageTop'
import ProjectDetails from '../components/ProjectDetails/ProjectDetails'
import TopNavigation from '../components/TopNavigation/TopNavigation'

const ProjectDetailPage = () => {
    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    return (
        <Fragment>
            <TopNavigation />
            <PageTop pageTitle="Project Details" />
            <ProjectDetails />
            <Footer />
        </Fragment>
    )
}

export default ProjectDetailPage