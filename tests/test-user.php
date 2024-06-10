<?php

/**
 * Test user class
 * 
 */
class Test_User extends WP_UnitTestCase
{
    /**
     * Test user creation
     */
    public function test_user_creation()
    {
        $user_id = 34455544; // user id
        $user = get_user_by('id', $user_id);
        $this->assertEmpty($user, 'User does not exist');
    }
}
