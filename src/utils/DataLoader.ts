import { MemberList, GroupedMemberList } from '../model/MemberList'
import { Member } from '../model/Member'
import { MemberGroup } from '../model/MemberGroup'

abstract class DataLoader {
  abstract loadData (): MemberList
}

export class TestDataLoader extends DataLoader {

  public loadData (): GroupedMemberList {
    const ml: GroupedMemberList = new GroupedMemberList()
    const m1: Member = new Member('user1')
    const m2: Member = new Member('user2')
    const m3: Member = new Member('user3')
    const m4: Member = new Member('user4')
    ml.members.push(m1)
    ml.members.push(m2)
    ml.members.push(m3)
    ml.members.push(m4)

    const g1: MemberGroup = new MemberGroup('foo')
    const g2: MemberGroup = new MemberGroup('bar')

    ml.setGroup(g1, m1)
    ml.setGroup(g1, m2)
    ml.setGroup(g2, m3)
    ml.setGroup(g2, m4)

    return ml

  }
}
