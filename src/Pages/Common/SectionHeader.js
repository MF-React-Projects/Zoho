import React from 'react';

const SectionHeader = ({badge, title, desc}) => {
    return (
        <div className="section-header text-center">
            <h6 className="badge">{badge}</h6>
            <h3 className="section-title font-36">{title}</h3>
            {
                desc && <p>{desc}</p>
            }
        </div>
    );
};

export default SectionHeader;