// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import React from 'react';
import Video from './Video';

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Videos = React.createClass({
    render: function() {
        var params1 = { videoId: '4yogINjTl' },
            params2 = { videoId: 'Vk6WkNo6e' },
            params3 = { videoId: 'E1r4aXjal' },
            params4 = { videoId: 'VJX4_Giag' },
            params5 = { videoId: 'E16-u4iTg' },
            params6 = { videoId: '41oIONoTe' },
            params7 = { videoId: 'NkW3_Eiag' },
            params8 = { videoId: 'Ekybejz6e' },
            params9 = { videoId: 'VkWNxoMpl' },
            params10 = { videoId: '4Jtt7sfax' }
        ;
        return (
            <table className="table is-striped">
                <tbody>
                    <tr>
                        <td><Video params={params1} /></td>
                    </tr>
                    <tr>
                        <td><Video params={params2} /></td>
                    </tr>
                    <tr>
                        <td><Video params={params3} /></td>
                    </tr>
                    <tr>
                        <td><Video params={params4} /></td>
                    </tr>
                    <tr>
                        <td><Video params={params5} /></td>
                    </tr>
                    <tr>
                        <td><Video params={params6} /></td>
                    </tr>
                    <tr>
                        <td><Video params={params7} /></td>
                    </tr>
                    <tr>
                        <td><Video params={params8} /></td>
                    </tr>
                    <tr>
                        <td><Video params={params9} /></td>
                    </tr>
                    <tr>
                        <td><Video params={params10} /></td>
                    </tr>
                </tbody>
            </table>
        );
    }
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export default Videos;

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
