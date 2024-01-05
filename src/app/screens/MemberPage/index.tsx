import React from "react"
import { Container } from "@mui/material"
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom"
import { VisitorOtherPage } from "./VisitorOtherPage"
import { VisitMyPage } from "./VisitMyPage"
import "../../../css/my_page.css"




export function MemberPage(props: any) {
    //Initializations
    const member = useRouteMatch(),
        { verifiedMemberData } = props,
        useQuery = () => {
            const { search } = useLocation();
            return React.useMemo(() => (new URLSearchParams(search)), [search])
        },
        chosen_mb_id = useQuery().get("chosen_mb_id"),
        chosen_art_id = useQuery().get("chosen_art_id");
    //Handlers
    return (
        <div className="member_page">
            <Switch>
                <Route path={`${member.path}/other`}>
                    <VisitorOtherPage
                        verifiedMemberData={verifiedMemberData}
                        chosen_mb_id={chosen_mb_id}
                        chosen_art_id={chosen_art_id}
                    />
                </Route>
                <Route path={`${member.path}/`}>
                    <VisitMyPage
                        verifiedMemberData={verifiedMemberData}
                        chosen_art_id={chosen_art_id}
                    />
                </Route>
            </Switch>
        </div>
    )
}