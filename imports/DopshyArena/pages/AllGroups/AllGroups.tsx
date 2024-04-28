import React from 'react';
import { useSections } from '../../../helpers/hooks/useSections';
import { Circles } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useTrainer } from '../../../helpers/hooks/useTrainer';
import './AllGroups.scss'

const AllGroups = () => {
    const { sections, isSectionsLoading } = useSections();
    const trainerId = Meteor.user()?._id
    const { trainer } = useTrainer(trainerId)

    const groupsForCurrentTrainer = sections.filter(group => group?.group === trainer?.group)

    if (isSectionsLoading) {
        return (
            <div className='groups__wrapper'>
                <Circles />
            </div>
        )
    }

    return (
        <div className='groups__wrapper'>
            {
                groupsForCurrentTrainer.map((item) => (
                    <Link to={`${item._id}`}>
                        <Button key={item._id} >{item.group}</Button>
                    </Link>
                ))
            }
        </div>
    )
}

export default AllGroups;