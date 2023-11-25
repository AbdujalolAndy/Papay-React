import React from "react"
import { Container } from "@mui/material"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import { VisitorOtherPage } from "./VisitorOtherPage"
import { VisitMyPage } from "./VisitMyPage"
import "../../../css/my_page.css"

export function MemberPage() {
    const member = useRouteMatch()
    console.log(member)
    return (
        <div className="member_page">
            <Switch>
                <Route path={`${member.path}/other`}>
                    <VisitorOtherPage />
                </Route>
                <Route path={`${member.path}/`}>
                    <VisitMyPage />
                </Route>
            </Switch>
        </div>
    )
}